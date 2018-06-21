namespace KMHSSS
{
    partial class Van_Student_Analysis_Details_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.Van_Student_Analysis_Details_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.Trip_Type_CBox = new System.Windows.Forms.ComboBox();
            this.Place_CBox = new System.Windows.Forms.ComboBox();
            this.SMonth_CBox = new System.Windows.Forms.ComboBox();
            this.Trip_CHBox = new System.Windows.Forms.CheckBox();
            this.Place_CHBox = new System.Windows.Forms.CheckBox();
            this.SMonth_CHBox = new System.Windows.Forms.CheckBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.Section_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.Alert_Msg_Lbl = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.label9 = new System.Windows.Forms.Label();
            this.Print_Lbl = new System.Windows.Forms.Label();
            this.Van_Number_CBox = new System.Windows.Forms.ComboBox();
            this.Van_No_CHBox = new System.Windows.Forms.CheckBox();
            ((System.ComponentModel.ISupportInitialize)(this.Van_Student_Analysis_Details_dataGridView1)).BeginInit();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // Van_Student_Analysis_Details_dataGridView1
            // 
            this.Van_Student_Analysis_Details_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Van_Student_Analysis_Details_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Van_Student_Analysis_Details_dataGridView1.Location = new System.Drawing.Point(29, 33);
            this.Van_Student_Analysis_Details_dataGridView1.Name = "Van_Student_Analysis_Details_dataGridView1";
            this.Van_Student_Analysis_Details_dataGridView1.Size = new System.Drawing.Size(1251, 419);
            this.Van_Student_Analysis_Details_dataGridView1.TabIndex = 6;
            this.Van_Student_Analysis_Details_dataGridView1.VirtualMode = true;
            this.Van_Student_Analysis_Details_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Van_Student_Analysis_Details_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.Alert_Msg_Lbl);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(17, 49);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1332, 647);
            this.groupBox1.TabIndex = 24;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Van Student Analysis Details";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Van_Number_CBox);
            this.groupBox2.Controls.Add(this.Trip_Type_CBox);
            this.groupBox2.Controls.Add(this.Van_No_CHBox);
            this.groupBox2.Controls.Add(this.Place_CBox);
            this.groupBox2.Controls.Add(this.SMonth_CBox);
            this.groupBox2.Controls.Add(this.Trip_CHBox);
            this.groupBox2.Controls.Add(this.Place_CHBox);
            this.groupBox2.Controls.Add(this.SMonth_CHBox);
            this.groupBox2.Controls.Add(this.View_Btn);
            this.groupBox2.Controls.Add(this.Section_CHBox);
            this.groupBox2.Controls.Add(this.Class_CHBox);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.AYear_CHBox);
            this.groupBox2.Controls.Add(this.Sec_CBox);
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.Location = new System.Drawing.Point(15, 27);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1301, 88);
            this.groupBox2.TabIndex = 26;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Select";
            // 
            // Trip_Type_CBox
            // 
            this.Trip_Type_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Trip_Type_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Trip_Type_CBox.FormattingEnabled = true;
            this.Trip_Type_CBox.Location = new System.Drawing.Point(983, 34);
            this.Trip_Type_CBox.Name = "Trip_Type_CBox";
            this.Trip_Type_CBox.Size = new System.Drawing.Size(82, 29);
            this.Trip_Type_CBox.TabIndex = 271;
            // 
            // Place_CBox
            // 
            this.Place_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Place_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Place_CBox.FormattingEnabled = true;
            this.Place_CBox.Location = new System.Drawing.Point(771, 33);
            this.Place_CBox.Name = "Place_CBox";
            this.Place_CBox.Size = new System.Drawing.Size(147, 29);
            this.Place_CBox.TabIndex = 26;
            // 
            // SMonth_CBox
            // 
            this.SMonth_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SMonth_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SMonth_CBox.FormattingEnabled = true;
            this.SMonth_CBox.Items.AddRange(new object[] {
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY"});
            this.SMonth_CBox.Location = new System.Drawing.Point(595, 34);
            this.SMonth_CBox.Name = "SMonth_CBox";
            this.SMonth_CBox.Size = new System.Drawing.Size(98, 29);
            this.SMonth_CBox.TabIndex = 261;
            // 
            // Trip_CHBox
            // 
            this.Trip_CHBox.AutoSize = true;
            this.Trip_CHBox.Location = new System.Drawing.Point(927, 36);
            this.Trip_CHBox.Name = "Trip_CHBox";
            this.Trip_CHBox.Size = new System.Drawing.Size(58, 25);
            this.Trip_CHBox.TabIndex = 270;
            this.Trip_CHBox.Text = "Trip";
            this.Trip_CHBox.UseVisualStyleBackColor = true;
            // 
            // Place_CHBox
            // 
            this.Place_CHBox.AutoSize = true;
            this.Place_CHBox.Location = new System.Drawing.Point(703, 36);
            this.Place_CHBox.Name = "Place_CHBox";
            this.Place_CHBox.Size = new System.Drawing.Size(65, 25);
            this.Place_CHBox.TabIndex = 269;
            this.Place_CHBox.Text = "Place";
            this.Place_CHBox.UseVisualStyleBackColor = true;
            // 
            // SMonth_CHBox
            // 
            this.SMonth_CHBox.AutoSize = true;
            this.SMonth_CHBox.Location = new System.Drawing.Point(510, 36);
            this.SMonth_CHBox.Name = "SMonth_CHBox";
            this.SMonth_CHBox.Size = new System.Drawing.Size(84, 25);
            this.SMonth_CHBox.TabIndex = 264;
            this.SMonth_CHBox.Text = "SMonth";
            this.SMonth_CHBox.UseVisualStyleBackColor = true;
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1213, 25);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(81, 47);
            this.View_Btn.TabIndex = 267;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // Section_CHBox
            // 
            this.Section_CHBox.AutoSize = true;
            this.Section_CHBox.Location = new System.Drawing.Point(378, 37);
            this.Section_CHBox.Name = "Section_CHBox";
            this.Section_CHBox.Size = new System.Drawing.Size(55, 25);
            this.Section_CHBox.TabIndex = 266;
            this.Section_CHBox.Text = "Sec";
            this.Section_CHBox.UseVisualStyleBackColor = true;
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(233, 38);
            this.Class_CHBox.Name = "Class_CHBox";
            this.Class_CHBox.Size = new System.Drawing.Size(64, 25);
            this.Class_CHBox.TabIndex = 265;
            this.Class_CHBox.Text = "Class";
            this.Class_CHBox.UseVisualStyleBackColor = true;
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(297, 35);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(71, 29);
            this.Class_CBox.TabIndex = 221;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(10, 37);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(73, 25);
            this.AYear_CHBox.TabIndex = 264;
            this.AYear_CHBox.Text = "AYear";
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(439, 34);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(59, 29);
            this.Sec_CBox.TabIndex = 222;
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(159, 35);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(64, 28);
            this.EYear_Txt.TabIndex = 260;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(84, 35);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(70, 29);
            this.SYear_CBox.TabIndex = 261;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(1213, 25);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(81, 47);
            this.Close_Btn.TabIndex = 3;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // Alert_Msg_Lbl
            // 
            this.Alert_Msg_Lbl.AutoSize = true;
            this.Alert_Msg_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Alert_Msg_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Alert_Msg_Lbl.Location = new System.Drawing.Point(523, 612);
            this.Alert_Msg_Lbl.Name = "Alert_Msg_Lbl";
            this.Alert_Msg_Lbl.Size = new System.Drawing.Size(124, 23);
            this.Alert_Msg_Lbl.TabIndex = 267;
            this.Alert_Msg_Lbl.Text = "Alert Message";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Van_Student_Analysis_Details_dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(17, 116);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(1299, 482);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(517, 17);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(281, 27);
            this.label9.TabIndex = 25;
            this.label9.Text = "Van Student Analysis Details";
            // 
            // Print_Lbl
            // 
            this.Print_Lbl.AutoSize = true;
            this.Print_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Print_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Print_Lbl.Location = new System.Drawing.Point(1222, 19);
            this.Print_Lbl.Name = "Print_Lbl";
            this.Print_Lbl.Size = new System.Drawing.Size(124, 27);
            this.Print_Lbl.TabIndex = 115;
            this.Print_Lbl.Text = "Print Report";
            this.Print_Lbl.Click += new System.EventHandler(this.Print_Lbl_Click);
            // 
            // Van_Number_CBox
            // 
            this.Van_Number_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Van_Number_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Van_Number_CBox.FormattingEnabled = true;
            this.Van_Number_CBox.Location = new System.Drawing.Point(1156, 34);
            this.Van_Number_CBox.Name = "Van_Number_CBox";
            this.Van_Number_CBox.Size = new System.Drawing.Size(47, 29);
            this.Van_Number_CBox.TabIndex = 273;
            // 
            // Van_No_CHBox
            // 
            this.Van_No_CHBox.AutoSize = true;
            this.Van_No_CHBox.Location = new System.Drawing.Point(1075, 36);
            this.Van_No_CHBox.Name = "Van_No_CHBox";
            this.Van_No_CHBox.Size = new System.Drawing.Size(82, 25);
            this.Van_No_CHBox.TabIndex = 272;
            this.Van_No_CHBox.Text = "Van No";
            this.Van_No_CHBox.UseVisualStyleBackColor = true;
            // 
            // Van_Student_Analysis_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.Print_Lbl);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Van_Student_Analysis_Details_Frm";
            this.Text = "Van Student Analysis Details";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Van_Student_Analysis_Details_Frm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.Van_Student_Analysis_Details_dataGridView1)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView Van_Student_Analysis_Details_dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label Alert_Msg_Lbl;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.CheckBox Trip_CHBox;
        private System.Windows.Forms.CheckBox Place_CHBox;
        private System.Windows.Forms.CheckBox SMonth_CHBox;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.CheckBox Section_CHBox;
        private System.Windows.Forms.CheckBox Class_CHBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.ComboBox SMonth_CBox;
        private System.Windows.Forms.ComboBox Place_CBox;
        private System.Windows.Forms.ComboBox Trip_Type_CBox;
        private System.Windows.Forms.Label Print_Lbl;
        private System.Windows.Forms.ComboBox Van_Number_CBox;
        private System.Windows.Forms.CheckBox Van_No_CHBox;

    }
}