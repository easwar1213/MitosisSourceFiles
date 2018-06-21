namespace KMHSSS
{
    partial class Backup_Frm
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
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.restore_but = new System.Windows.Forms.Button();
            this.restore_text = new System.Windows.Forms.TextBox();
            this.Browse2_but = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Browse1_but = new System.Windows.Forms.Button();
            this.BackUp_but = new System.Windows.Forms.Button();
            this.loca_text = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.butt_connect = new System.Windows.Forms.Button();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.database_comba = new System.Windows.Forms.ComboBox();
            this.dbname_text = new System.Windows.Forms.TextBox();
            this.Disconnect_but = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(27, 19);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(797, 541);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Database Backup";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.restore_but);
            this.groupBox4.Controls.Add(this.restore_text);
            this.groupBox4.Controls.Add(this.Browse2_but);
            this.groupBox4.Controls.Add(this.label4);
            this.groupBox4.Location = new System.Drawing.Point(31, 361);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(742, 150);
            this.groupBox4.TabIndex = 2;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Restore";
            // 
            // restore_but
            // 
            this.restore_but.Location = new System.Drawing.Point(582, 86);
            this.restore_but.Name = "restore_but";
            this.restore_but.Size = new System.Drawing.Size(107, 51);
            this.restore_but.TabIndex = 18;
            this.restore_but.Text = "Restore";
            this.restore_but.UseVisualStyleBackColor = true;
            this.restore_but.Click += new System.EventHandler(this.restore_but_Click);
            // 
            // restore_text
            // 
            this.restore_text.Location = new System.Drawing.Point(189, 48);
            this.restore_text.Name = "restore_text";
            this.restore_text.Size = new System.Drawing.Size(335, 30);
            this.restore_text.TabIndex = 15;
            this.restore_text.KeyDown += new System.Windows.Forms.KeyEventHandler(this.restore_text_KeyDown);
            // 
            // Browse2_but
            // 
            this.Browse2_but.Location = new System.Drawing.Point(582, 23);
            this.Browse2_but.Name = "Browse2_but";
            this.Browse2_but.Size = new System.Drawing.Size(107, 53);
            this.Browse2_but.TabIndex = 17;
            this.Browse2_but.Text = "Browse";
            this.Browse2_but.UseVisualStyleBackColor = true;
            this.Browse2_but.Click += new System.EventHandler(this.Browse2_but_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(33, 55);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(139, 23);
            this.label4.TabIndex = 16;
            this.label4.Text = "Backup File Path";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Browse1_but);
            this.groupBox3.Controls.Add(this.BackUp_but);
            this.groupBox3.Controls.Add(this.loca_text);
            this.groupBox3.Controls.Add(this.label3);
            this.groupBox3.Location = new System.Drawing.Point(29, 194);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(742, 150);
            this.groupBox3.TabIndex = 1;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Backup";
            // 
            // Browse1_but
            // 
            this.Browse1_but.Location = new System.Drawing.Point(582, 26);
            this.Browse1_but.Name = "Browse1_but";
            this.Browse1_but.Size = new System.Drawing.Size(107, 51);
            this.Browse1_but.TabIndex = 14;
            this.Browse1_but.Text = "Browse";
            this.Browse1_but.UseVisualStyleBackColor = true;
            this.Browse1_but.Click += new System.EventHandler(this.Browse1_but_Click);
            // 
            // BackUp_but
            // 
            this.BackUp_but.Location = new System.Drawing.Point(582, 88);
            this.BackUp_but.Name = "BackUp_but";
            this.BackUp_but.Size = new System.Drawing.Size(107, 48);
            this.BackUp_but.TabIndex = 13;
            this.BackUp_but.Text = "BackUp";
            this.BackUp_but.UseVisualStyleBackColor = true;
            this.BackUp_but.Click += new System.EventHandler(this.BackUp_but_Click);
            // 
            // loca_text
            // 
            this.loca_text.Location = new System.Drawing.Point(189, 42);
            this.loca_text.Name = "loca_text";
            this.loca_text.Size = new System.Drawing.Size(335, 30);
            this.loca_text.TabIndex = 12;
            this.loca_text.KeyDown += new System.Windows.Forms.KeyEventHandler(this.loca_text_KeyDown);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(31, 49);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(132, 23);
            this.label3.TabIndex = 11;
            this.label3.Text = "Backup Location";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.butt_connect);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Controls.Add(this.database_comba);
            this.groupBox2.Controls.Add(this.dbname_text);
            this.groupBox2.Controls.Add(this.Disconnect_but);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Location = new System.Drawing.Point(28, 28);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(742, 150);
            this.groupBox2.TabIndex = 0;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Connection";
            // 
            // butt_connect
            // 
            this.butt_connect.Location = new System.Drawing.Point(584, 25);
            this.butt_connect.Name = "butt_connect";
            this.butt_connect.Size = new System.Drawing.Size(108, 52);
            this.butt_connect.TabIndex = 16;
            this.butt_connect.Text = "Connect";
            this.butt_connect.UseVisualStyleBackColor = true;
            this.butt_connect.Click += new System.EventHandler(this.butt_connect_Click);
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(583, 29);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(108, 44);
            this.Close_Btn.TabIndex = 15;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(32, 88);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(134, 23);
            this.label2.TabIndex = 14;
            this.label2.Text = "Database Name";
            // 
            // database_comba
            // 
            this.database_comba.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.database_comba.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.database_comba.FormattingEnabled = true;
            this.database_comba.Location = new System.Drawing.Point(189, 85);
            this.database_comba.Name = "database_comba";
            this.database_comba.Size = new System.Drawing.Size(335, 31);
            this.database_comba.TabIndex = 13;
            this.database_comba.KeyDown += new System.Windows.Forms.KeyEventHandler(this.database_comba_KeyDown);
            // 
            // dbname_text
            // 
            this.dbname_text.Location = new System.Drawing.Point(189, 39);
            this.dbname_text.Name = "dbname_text";
            this.dbname_text.Size = new System.Drawing.Size(335, 30);
            this.dbname_text.TabIndex = 9;
            this.dbname_text.Text = "KMHSS-PC\\SQLEXPRESS";
            this.dbname_text.KeyDown += new System.Windows.Forms.KeyEventHandler(this.dbname_text_KeyDown);
            // 
            // Disconnect_but
            // 
            this.Disconnect_but.Location = new System.Drawing.Point(583, 88);
            this.Disconnect_but.Name = "Disconnect_but";
            this.Disconnect_but.Size = new System.Drawing.Size(108, 52);
            this.Disconnect_but.TabIndex = 12;
            this.Disconnect_but.Text = "Disconnect";
            this.Disconnect_but.UseVisualStyleBackColor = true;
            this.Disconnect_but.Click += new System.EventHandler(this.Disconnect_but_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(33, 42);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(113, 23);
            this.label1.TabIndex = 10;
            this.label1.Text = "Server Name";
            // 
            // Backup_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(848, 584);
            this.Controls.Add(this.groupBox1);
            this.Name = "Backup_Frm";
            this.Text = "Backup";
            this.Load += new System.EventHandler(this.Backup_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox database_comba;
        private System.Windows.Forms.TextBox dbname_text;
        private System.Windows.Forms.Button Disconnect_but;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button restore_but;
        private System.Windows.Forms.TextBox restore_text;
        private System.Windows.Forms.Button Browse2_but;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button Browse1_but;
        private System.Windows.Forms.Button BackUp_but;
        private System.Windows.Forms.TextBox loca_text;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button butt_connect;
        private System.Windows.Forms.Button Close_Btn;
    }
}