namespace KMHSSS
{
    partial class Outstanding_Hostel_Fees_Details_Frm
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
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.EMonth_CHBox = new System.Windows.Forms.CheckBox();
            this.EMonth_CBox = new System.Windows.Forms.ComboBox();
            this.Month_CHBox = new System.Windows.Forms.CheckBox();
            this.SMonth_CHBox = new System.Windows.Forms.CheckBox();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.Section_CHBox = new System.Windows.Forms.CheckBox();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.SMonth_CBox = new System.Windows.Forms.ComboBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.Month_CBox = new System.Windows.Forms.ComboBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Outstanding_Hostel_Fees_Details_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.label9 = new System.Windows.Forms.Label();
            this.Print_Lbl = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Outstanding_Hostel_Fees_Details_dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(23, 43);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1322, 678);
            this.groupBox1.TabIndex = 28;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Outstanding Hostel Fees Details";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.View_Btn);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.Controls.Add(this.EMonth_CHBox);
            this.groupBox2.Controls.Add(this.EMonth_CBox);
            this.groupBox2.Controls.Add(this.Month_CHBox);
            this.groupBox2.Controls.Add(this.SMonth_CHBox);
            this.groupBox2.Controls.Add(this.Sec_CBox);
            this.groupBox2.Controls.Add(this.Section_CHBox);
            this.groupBox2.Controls.Add(this.AYear_CHBox);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.Class_CHBox);
            this.groupBox2.Controls.Add(this.SMonth_CBox);
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Controls.Add(this.Month_CBox);
            this.groupBox2.Location = new System.Drawing.Point(20, 22);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1279, 97);
            this.groupBox2.TabIndex = 10;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Select";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1174, 23);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(89, 62);
            this.View_Btn.TabIndex = 281;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(1174, 25);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(89, 62);
            this.Close_Btn.TabIndex = 280;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // EMonth_CHBox
            // 
            this.EMonth_CHBox.AutoSize = true;
            this.EMonth_CHBox.Location = new System.Drawing.Point(736, 41);
            this.EMonth_CHBox.Name = "EMonth_CHBox";
            this.EMonth_CHBox.Size = new System.Drawing.Size(83, 25);
            this.EMonth_CHBox.TabIndex = 274;
            this.EMonth_CHBox.Text = "EMonth";
            this.EMonth_CHBox.UseVisualStyleBackColor = true;
            this.EMonth_CHBox.CheckedChanged += new System.EventHandler(this.EMonth_CHBox_CheckedChanged);
            // 
            // EMonth_CBox
            // 
            this.EMonth_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.EMonth_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.EMonth_CBox.FormattingEnabled = true;
            this.EMonth_CBox.Items.AddRange(new object[] {
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
            this.EMonth_CBox.Location = new System.Drawing.Point(825, 38);
            this.EMonth_CBox.Name = "EMonth_CBox";
            this.EMonth_CBox.Size = new System.Drawing.Size(124, 29);
            this.EMonth_CBox.TabIndex = 273;
            // 
            // Month_CHBox
            // 
            this.Month_CHBox.AutoSize = true;
            this.Month_CHBox.Location = new System.Drawing.Point(961, 41);
            this.Month_CHBox.Name = "Month_CHBox";
            this.Month_CHBox.Size = new System.Drawing.Size(74, 25);
            this.Month_CHBox.TabIndex = 272;
            this.Month_CHBox.Text = "Month";
            this.Month_CHBox.UseVisualStyleBackColor = true;
            this.Month_CHBox.CheckedChanged += new System.EventHandler(this.Month_CHBox_CheckedChanged);
            // 
            // SMonth_CHBox
            // 
            this.SMonth_CHBox.AutoSize = true;
            this.SMonth_CHBox.Checked = true;
            this.SMonth_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.SMonth_CHBox.Location = new System.Drawing.Point(513, 42);
            this.SMonth_CHBox.Name = "SMonth_CHBox";
            this.SMonth_CHBox.Size = new System.Drawing.Size(84, 25);
            this.SMonth_CHBox.TabIndex = 271;
            this.SMonth_CHBox.Text = "SMonth";
            this.SMonth_CHBox.UseVisualStyleBackColor = true;
            this.SMonth_CHBox.CheckedChanged += new System.EventHandler(this.SMonth_CHBox_CheckedChanged);
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(450, 39);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(54, 29);
            this.Sec_CBox.TabIndex = 268;
            // 
            // Section_CHBox
            // 
            this.Section_CHBox.AutoSize = true;
            this.Section_CHBox.Location = new System.Drawing.Point(389, 42);
            this.Section_CHBox.Name = "Section_CHBox";
            this.Section_CHBox.Size = new System.Drawing.Size(55, 25);
            this.Section_CHBox.TabIndex = 270;
            this.Section_CHBox.Text = "Sec";
            this.Section_CHBox.UseVisualStyleBackColor = true;
            this.Section_CHBox.CheckedChanged += new System.EventHandler(this.Section_CHBox_CheckedChanged);
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(19, 43);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(73, 25);
            this.AYear_CHBox.TabIndex = 265;
            this.AYear_CHBox.Text = "AYear";
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            this.AYear_CHBox.CheckedChanged += new System.EventHandler(this.AYear_CHBox_CheckedChanged);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(319, 39);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(63, 29);
            this.Class_CBox.TabIndex = 267;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(253, 43);
            this.Class_CHBox.Name = "Class_CHBox";
            this.Class_CHBox.Size = new System.Drawing.Size(64, 25);
            this.Class_CHBox.TabIndex = 269;
            this.Class_CHBox.Text = "Class";
            this.Class_CHBox.UseVisualStyleBackColor = true;
            this.Class_CHBox.CheckedChanged += new System.EventHandler(this.Class_CHBox_CheckedChanged);
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
            this.SMonth_CBox.Location = new System.Drawing.Point(602, 38);
            this.SMonth_CBox.Name = "SMonth_CBox";
            this.SMonth_CBox.Size = new System.Drawing.Size(120, 29);
            this.SMonth_CBox.TabIndex = 260;
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(171, 41);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(70, 28);
            this.EYear_Txt.TabIndex = 257;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(94, 40);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(72, 29);
            this.SYear_CBox.TabIndex = 258;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // Month_CBox
            // 
            this.Month_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Month_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Month_CBox.FormattingEnabled = true;
            this.Month_CBox.Items.AddRange(new object[] {
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
            this.Month_CBox.Location = new System.Drawing.Point(1040, 39);
            this.Month_CBox.Name = "Month_CBox";
            this.Month_CBox.Size = new System.Drawing.Size(123, 29);
            this.Month_CBox.TabIndex = 1;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Outstanding_Hostel_Fees_Details_dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(24, 124);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(1271, 527);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Outstanding_Hostel_Fees_Details_dataGridView1
            // 
            this.Outstanding_Hostel_Fees_Details_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Outstanding_Hostel_Fees_Details_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Outstanding_Hostel_Fees_Details_dataGridView1.Location = new System.Drawing.Point(30, 37);
            this.Outstanding_Hostel_Fees_Details_dataGridView1.Name = "Outstanding_Hostel_Fees_Details_dataGridView1";
            this.Outstanding_Hostel_Fees_Details_dataGridView1.Size = new System.Drawing.Size(1214, 466);
            this.Outstanding_Hostel_Fees_Details_dataGridView1.TabIndex = 6;
            this.Outstanding_Hostel_Fees_Details_dataGridView1.VirtualMode = true;
            this.Outstanding_Hostel_Fees_Details_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Outstanding_Hostel_Fees_Details_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(542, 13);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(311, 27);
            this.label9.TabIndex = 29;
            this.label9.Text = "Outstanding Hostel Fees Details";
            // 
            // Print_Lbl
            // 
            this.Print_Lbl.AutoSize = true;
            this.Print_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Print_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Print_Lbl.Location = new System.Drawing.Point(1221, 13);
            this.Print_Lbl.Name = "Print_Lbl";
            this.Print_Lbl.Size = new System.Drawing.Size(124, 27);
            this.Print_Lbl.TabIndex = 115;
            this.Print_Lbl.Text = "Print Report";
            this.Print_Lbl.Click += new System.EventHandler(this.Print_Lbl_Click);
            // 
            // Outstanding_Hostel_Fees_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.Print_Lbl);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Outstanding_Hostel_Fees_Details_Frm";
            this.Text = "Outstanding Hostel Fees Details";
            this.Load += new System.EventHandler(this.Outstanding_Hostel_Fees_Details_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Outstanding_Hostel_Fees_Details_dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Outstanding_Hostel_Fees_Details_dataGridView1;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.CheckBox EMonth_CHBox;
        private System.Windows.Forms.ComboBox EMonth_CBox;
        private System.Windows.Forms.CheckBox Month_CHBox;
        private System.Windows.Forms.CheckBox SMonth_CHBox;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.CheckBox Section_CHBox;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.CheckBox Class_CHBox;
        private System.Windows.Forms.ComboBox SMonth_CBox;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.ComboBox Month_CBox;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Label Print_Lbl;
    }
}