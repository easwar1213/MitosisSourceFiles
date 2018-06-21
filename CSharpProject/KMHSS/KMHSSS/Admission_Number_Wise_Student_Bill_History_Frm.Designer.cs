namespace KMHSSS
{
    partial class Admission_Number_Wise_Student_Bill_History_Frm
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
            this.Alert_Msg_Lbl = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.label9 = new System.Windows.Forms.Label();
            this.Admission_No_CHBox = new System.Windows.Forms.CheckBox();
            this.Admission_No_Txt = new System.Windows.Forms.TextBox();
            this.Bill_Type_CBox = new System.Windows.Forms.ComboBox();
            this.Bill_Type_CHBox = new System.Windows.Forms.CheckBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Admission_Number_Wise_Student_Bill_History_dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.Alert_Msg_Lbl);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(28, 51);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1311, 675);
            this.groupBox1.TabIndex = 112;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Admission Number Wise Student Bill History";
            // 
            // Alert_Msg_Lbl
            // 
            this.Alert_Msg_Lbl.AutoSize = true;
            this.Alert_Msg_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Alert_Msg_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Alert_Msg_Lbl.Location = new System.Drawing.Point(689, 639);
            this.Alert_Msg_Lbl.Name = "Alert_Msg_Lbl";
            this.Alert_Msg_Lbl.Size = new System.Drawing.Size(124, 23);
            this.Alert_Msg_Lbl.TabIndex = 275;
            this.Alert_Msg_Lbl.Text = "Alert Message";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Bill_Type_CHBox);
            this.groupBox2.Controls.Add(this.Bill_Type_CBox);
            this.groupBox2.Controls.Add(this.Admission_No_CHBox);
            this.groupBox2.Controls.Add(this.Admission_No_Txt);
            this.groupBox2.Controls.Add(this.View_Btn);
            this.groupBox2.Controls.Add(this.AYear_CHBox);
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Location = new System.Drawing.Point(28, 27);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1256, 99);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Select";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1124, 21);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(89, 62);
            this.View_Btn.TabIndex = 275;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Location = new System.Drawing.Point(428, 40);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(73, 25);
            this.AYear_CHBox.TabIndex = 266;
            this.AYear_CHBox.Text = "AYear";
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            this.AYear_CHBox.CheckedChanged += new System.EventHandler(this.AYear_CHBox_CheckedChanged);
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(641, 38);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(117, 28);
            this.EYear_Txt.TabIndex = 251;
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(1124, 21);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(89, 62);
            this.Close_Btn.TabIndex = 2;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(510, 37);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(125, 29);
            this.SYear_CBox.TabIndex = 252;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Admission_Number_Wise_Student_Bill_History_dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(27, 136);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(1257, 494);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Admission_Number_Wise_Student_Bill_History_dataGridView1
            // 
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.Location = new System.Drawing.Point(27, 36);
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.Name = "Admission_Number_Wise_Student_Bill_History_dataGridView1";
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.Size = new System.Drawing.Size(1204, 433);
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.TabIndex = 6;
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.VirtualMode = true;
            this.Admission_Number_Wise_Student_Bill_History_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Admission_Number_Wise_Student_Bill_History_dataGridView1_CellValueNeeded);
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
            this.label9.Location = new System.Drawing.Point(550, 21);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(424, 27);
            this.label9.TabIndex = 113;
            this.label9.Text = "Admission Number Wise Student Bill History";
            // 
            // Admission_No_CHBox
            // 
            this.Admission_No_CHBox.AutoSize = true;
            this.Admission_No_CHBox.Checked = true;
            this.Admission_No_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.Admission_No_CHBox.Location = new System.Drawing.Point(51, 41);
            this.Admission_No_CHBox.Name = "Admission_No_CHBox";
            this.Admission_No_CHBox.Size = new System.Drawing.Size(126, 25);
            this.Admission_No_CHBox.TabIndex = 277;
            this.Admission_No_CHBox.Text = "Admission No";
            this.Admission_No_CHBox.UseVisualStyleBackColor = true;
            this.Admission_No_CHBox.CheckedChanged += new System.EventHandler(this.Admission_No_CHBox_CheckedChanged);
            // 
            // Admission_No_Txt
            // 
            this.Admission_No_Txt.ForeColor = System.Drawing.Color.Black;
            this.Admission_No_Txt.Location = new System.Drawing.Point(193, 39);
            this.Admission_No_Txt.Name = "Admission_No_Txt";
            this.Admission_No_Txt.Size = new System.Drawing.Size(191, 28);
            this.Admission_No_Txt.TabIndex = 276;
            // 
            // Bill_Type_CBox
            // 
            this.Bill_Type_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Bill_Type_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Bill_Type_CBox.FormattingEnabled = true;
            this.Bill_Type_CBox.Items.AddRange(new object[] {
            "SCHOOL BILL",
            "HOSTEL BILL",
            "VAN BILL",
            "STATIONARY BILL",
            "OTHER SCHOOL BILL",
            "OTHER HOSTEL BILL"});
            this.Bill_Type_CBox.Location = new System.Drawing.Point(895, 36);
            this.Bill_Type_CBox.Name = "Bill_Type_CBox";
            this.Bill_Type_CBox.Size = new System.Drawing.Size(190, 29);
            this.Bill_Type_CBox.TabIndex = 278;
            // 
            // Bill_Type_CHBox
            // 
            this.Bill_Type_CHBox.AutoSize = true;
            this.Bill_Type_CHBox.Location = new System.Drawing.Point(782, 40);
            this.Bill_Type_CHBox.Name = "Bill_Type_CHBox";
            this.Bill_Type_CHBox.Size = new System.Drawing.Size(91, 25);
            this.Bill_Type_CHBox.TabIndex = 279;
            this.Bill_Type_CHBox.Text = "Bill Type";
            this.Bill_Type_CHBox.UseVisualStyleBackColor = true;
            this.Bill_Type_CHBox.CheckedChanged += new System.EventHandler(this.Bill_Type_CHBox_CheckedChanged);
            // 
            // Admission_Number_Wise_Student_Bill_History_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Admission_Number_Wise_Student_Bill_History_Frm";
            this.Text = "Admission Number Wise Student Bill History";
            this.Load += new System.EventHandler(this.Admission_Number_Wise_Student_Bill_History_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Admission_Number_Wise_Student_Bill_History_dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label Alert_Msg_Lbl;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.CheckBox Admission_No_CHBox;
        private System.Windows.Forms.TextBox Admission_No_Txt;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Admission_Number_Wise_Student_Bill_History_dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.ComboBox Bill_Type_CBox;
        private System.Windows.Forms.CheckBox Bill_Type_CHBox;
    }
}